import type {Request} from 'express'
import * as U from '../utils'

export const getUserIdFromJwtP = (req: Request) =>
  new Promise<string>(async (resolve, reject) => {
    const {authorization} = req.headers || {}
    if (!authorization) {
      res.json({ok: false, errorMessage: 'JSON 토큰이 없습니다.'})
      return
    }
    try {
      const tmp = authorization.split(' ')
      if (tmp.length !== 2)
        res.json({ok: false, errorMessage: '헤더에서 JSON 토큰을 얻을 수 없습니다.'})
      else {
        const jwt = tmp[1]
        const decoded = (await U.jwtVerifyP(jwt)) as {userId: string}
        const result = await user.findOne({_id: stringToObjectId(decoded.userId)})
        if (!result) {
          res.json({ok: false, errorMessage: '등록되지 않은 사용자 입니다.'})
          return
        }

        const {email, password} = req.body
        if (email !== result.email) {
          res.json({ok: false, errorMessage: '이메일 주소가 틀립니다.'})
          return
        }
        const same = await U.comparePasswordP(password, result.password)
        if (false === same) {
          res.json({ok: false, errorMessage: '비밀번호가 틀립니다.'})
          return
        }

        res.json({ok: true})
      }
    } catch (e) {
      if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
    }
  })
