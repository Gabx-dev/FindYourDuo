import Express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import cors from 'cors';

import { convertMinutesToTimeString, convertTimeStringToMinutes } from './utils';

const app = Express();
app.use(Express.json());
app.use(cors());

const prisma = new PrismaClient();


app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  res.status(200);
  return res.json(games);
});

app.get('/ads', async (req, res) => {
  const ads = await prisma.ad.findMany();

  res.status(200);
  return res.json(ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      startTime: convertMinutesToTimeString(ad.startTime),
      endTime: convertMinutesToTimeString(ad.endTime),
    };
  }));
});

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      usesVoiceChannel: body.usesVoiceChannel,
      weekDays: body.weekDays.join(','),
      startTime: convertTimeStringToMinutes(body.startTime),
      endTime: convertTimeStringToMinutes(body.endTime),
    }
  });

  res.status(201);
  res.json(ad);
});

app.get('/games/:gameId/ads', async (req, res) => {
  const gameId = req.params.gameId;
  const ads = await prisma.ad.findMany({
    where: {
      gameId: gameId,
    },
    select: {
      id: true,
      name: true,
      usesVoiceChannel: true,
      weekDays: true,
      startTime: true,
      endTime: true,
      yearsPlaying: true,
      game: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.status(200);
  res.json(ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      startTime: convertMinutesToTimeString(ad.startTime),
      endTime: convertMinutesToTimeString(ad.endTime),
    };
  }));
});

app.get('/ads/:adId/user', async (req, res)  => {
  let adId = req.params.adId;
  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId
    },
    select: {
      discord: true,
    },
  });

  res.status(200);
  res.json({discord: ad.discord});
})

const port = 80;

app.listen(port, () => {
  console.log(`Listening for connections on port ${port}`);
});