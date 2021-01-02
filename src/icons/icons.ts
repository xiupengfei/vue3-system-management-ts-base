const svgs = require.context('./svg', false, /\.svg$/)

export interface IconData {
  name: string
  data: any
}

const icons: {
  [key: string]: IconData
} = {}

svgs.keys().map((p: string) => {
  const value: IconData = svgs(p)
  icons[value.name] = value
})

export default icons
