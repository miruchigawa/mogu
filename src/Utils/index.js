class Utils {
     static enumBuilder(keys={ }) {
          const obj = {}
          
          for (const [k, v] of Object.entries(keys)) {
               obj[k] = v
          }
          
          return obj
     }
}

module.exports = Utils