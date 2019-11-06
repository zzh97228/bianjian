const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

const Router = require('koa-router')
const cors = require('koa2-cors')
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

const router = new Router()

const continentalNames = ['Asia', 'Africa', 'Europe', 'America', 'Oceania']

const continentals = {
  '亚洲': {
    nations: ['韩国', '日本', '泰国'],
    lines: 103,
    abroadAirport: ['仁川国际机场', '东京成田空港']
  },
  '欧洲': {
    nations: ['英国', '德国', '俄罗斯'],
    lines: 102,
    abroadAirport: ['伦敦希斯罗机场', '曼彻斯特机场']
  }
}

router.get('/continental', (ctx) => {
  const { name, airport, region } = ctx.request.query
  if (!(name in continentals)) { return }

  const result = []
  for (let i = 0; i < 200; i++) {
    let localAirport
    let abroadAirport
    if (airport === 'PVG') {
      localAirport = '浦东国际机场'
    } else if (airport === 'SHA') {
      localAirport = '虹桥国际机场'
    } else {
      localAirport = Math.random() > 0.5 ? '浦东国际机场' : '虹桥国际机场'
    }
    if (!region || region.length === 0) {
      abroadAirport = continentals[name].nations[Math.round(Math.random() * continentals[name].nations.length)]
    } else {
      abroadAirport = continentals[name].nations[region]
    }
    const probability = Math.random() > 0.5
    const obj = {
      'flightNumber': 'CA1788',
      'departure': probability ? localAirport : abroadAirport,
      'destination': !probability ? localAirport : abroadAirport,
      'frequency': 3,
      'arrivalTime': '20191015233500'
    }
    result.push(obj)
  }
  ctx.body = {
    name,
    flights: result,
    lines: continentals[name].lines,
    nations: continentals[name].nations
  }
})

router.get('/entryExit', (ctx) => {
  ctx.body = {
    'flightCount': {
      'exit': Math.round(Math.random() * 1000000),
      'enter': Math.round(Math.random() * 1000000)
    },
    'people': {
      'exit': Math.round(Math.random() * 1000000),
      'enter': Math.round(Math.random() * 1000000)
    },
    'passengers': {
      'exit': Math.round(Math.random() * 1000000),
      'enter': Math.round(Math.random() * 1000000)
    },
    'staffs': {
      'exit': Math.round(Math.random() * 1000000),
      'enter': Math.round(Math.random() * 1000000)

    }
  }
})

router.get('/continentalFlights', (ctx) => {
  ctx.body = {
    china: [
      {
        name: '香港',
        entry: Math.round(Math.random() * 1000),
        exit: Math.round(Math.random() * 1000)
      },
      {
        name: '澳门',
        entry: Math.round(Math.random() * 1000),
        exit: Math.round(Math.random() * 1000)
      },
      {
        name: '台湾',
        entry: Math.round(Math.random() * 1000),
        exit: Math.round(Math.random() * 1000)
      }
    ],
    global: [
      {
        name: '亚洲',
        entry: Math.round(Math.random() * 1000),
        exit: Math.round(Math.random() * 1000)
      },
      {
        name: '欧洲',
        entry: Math.round(Math.random() * 1000),
        exit: Math.round(Math.random() * 1000)
      },
      {
        name: '非洲',
        entry: Math.round(Math.random() * 1000),
        exit: Math.round(Math.random() * 1000)
      }
    ]
  }
})

router.get('/getFlightLines', (ctx) => {
  const { continental, nation } = ctx.request.query
  const result = []
  if (continental && !nation) {
    result.push({
      portName: '东京成田机场',
      pvg: true,
      airbus: true,
      entry: true,
      coordinates: [140.22, 35.45],
      continental: 'Asia'
    })
  } else if (continental && nation) {

  } else {
    for (let i = 0; i < 20; i++) {
      result.push({
        portName: '仁川国际机场',
        pvg: Math.random() > 0.5,
        airbus: Math.random() > 0.5,
        // entry: Math.random() > 0.5,
        coordinates: [Math.random() * 200 - 100, Math.random() * 90 - 45],
        continental: continentalNames[Math.round(Math.random() * continentalNames.length)]
      })
    }
  }
  ctx.body = result
})

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '0.0.0.0',
    port = process.env.PORT || 3002
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(cors())
  app.use(router.routes())
  app.use(router.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
