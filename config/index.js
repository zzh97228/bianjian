export * from './MapConfig'

export const entryOrExit = {
  flightCount: {
    enter: 0,
    exit: 0
  },
  people: {
    enter: 0,
    exit: 0
  },
  passengers: {
    enter: 0,
    exit: 0
  },
  staffs: {
    enter: 0,
    exit: 0
  }
}

export const baseURL = {
  'production': 'http://6.0.96.95:8081/hxdp/airline',
  'local': 'http://localhost:8087',
  'dev': 'http://192.168.100.6:8081/hxdp/airline'
}
