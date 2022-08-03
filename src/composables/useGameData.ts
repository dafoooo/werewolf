import { useGameStore } from '@/stores/game'
import roles from '@/data/roles.json'

const game = useGameStore()
const { setPlayers, setTurns, setLog, setResult } = game

export const useGameData = (res: any) => {
  try {
    if (!res) return

    setPlayers(
      res.users.map((user: any) => {
        const userRole = roles.find((role) => role.roleId == user.role_id)

        return {
          userId: user.id,
          roleId: user.role_id,
          roleName: userRole?.roleName,
          subRoleId: user.sub_role_id,
          subRoleName: roles.find((card) => card.roleId == user.sub_role_id)?.roleName || null,
          name: user.name,
          function1: user.used_function_1 ? '' : userRole?.function1,
          function2: user.used_function_2 ? '' : userRole?.function2,
          hiddenFunction: user.used_hidden_function ? '' : userRole?.hiddenFunction,
          priority: userRole?.priority,
          quantity: userRole?.quantity,
          isDead: user.is_dead,
          isLink: user.is_link,
          isDad: user.is_dad,
          isSon: user.is_son,
        }
      }),
    )
    setTurns()
    if (res.log) setLog(res.log)
    if (res.message)
      setResult({
        deaths: res.message?.dead || [],
        silents: res.message?.khoa_mom || [],
        others: res.message?.other || [],
      })
  } catch (error) {
    console.log(error)
  }
}
