export type FlowItem = {
  id?: string
  pid?: string
  label: string
  desc: string
  bgColor: string
  children?: FlowItem[]
  position?: {
    y_min: number
    y_max: number
  }
}

export const flowData: FlowItem[] = [
  {
    id: `1`,
    pid: '0',
    label: 'node 1',
    desc: '一段文字介绍/详情',
    bgColor: '#101827',
    children: [
      {
        id: `2`,
        pid: '1',
        label: 'node 2',
        desc: '一段文字介绍/详情',
        bgColor: '#101827',
        children: [
          {
            id: `3`,
            pid: '2',
            label: 'node 3',
            desc: '一段文字介绍/详情',
            bgColor: '#101827',
          },
          {
            id: `4`,
            pid: '2',
            label: 'node 4',
            desc: '一段文字介绍/详情',
            bgColor: '#101827',
          },
          {
            id: `8`,
            pid: '2',
            label: 'node 8',
            desc: '一段文字介绍/详情',
            bgColor: '#101827',
          },
        ],
      },
      {
        id: `5`,
        pid: '1',
        label: 'node 5',
        desc: '一段文字介绍/详情',
        bgColor: '#101827',
        children: [
          {
            id: `7`,
            pid: '5',
            label: 'node 7',
            desc: '一段文字介绍/详情',
            bgColor: '#101827',
          },
          {
            id: `9`,
            pid: '5',
            label: 'node 9',
            desc: '一段文字介绍/详情',
            bgColor: '#101827',
          },
        ],
      },
      {
        id: `6`,
        pid: '1',
        label: 'node 6',
        desc: '一段文字介绍/详情',
        bgColor: '#101827',
      },
    ],
  },
]
