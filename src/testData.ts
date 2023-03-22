export interface ColumnProps {
  id: number
  avatar?: string
  title: string
  description: string
}

export interface PostProps {
  columnId: number
  id: number
  title: string
  createdAt: string
  image?: string
  content: string
}

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    description: "这是的test1专栏，有一段非常有意思的简介，可以更新一下欧",
  },

  {
    id: 2,
    title: "test2的专栏",
    description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },

  {
    id: 3,
    title: "test3的专栏",
    description: "这是的test3专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },

  {
    id: 4,
    title: "test4的专栏",
    description: "这是的test4专栏,有一段非常有意思的简介,可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
]

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: "这是我的第一篇文章",
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110",
    createdAt: "2023-01-09 10:34:22",
    columnId: 2,
  },
  {
    id: 2,
    title: "这是我的第二篇文章",
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    createdAt: "2022-06-11 10:34:22",
    columnId: 2,
  },
  {
    id: 3,
    title: "这是我的第三篇文章",
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image:
      "https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110",
    createdAt: "2023-03-11 10:34:22",
    columnId: 2,
  },
]
