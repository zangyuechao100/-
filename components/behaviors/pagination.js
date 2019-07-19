const paginationBec = Behavior({
  data: {
    dataArray: [],
    total: null
  },

  methods: {
    setMoreData (dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    getCurrentStart () {
      return this.data.dataArray.length
    },

    hasMore () {
      return this.data.dataArray.length >= this.data.total ? false : true
    },

    setTotal (total) {
      this.setData({
        total
      })
    },

    initialize () {
      this.setData({
        total: null,
        dataArray: []
      })
    }
  }
})
  
export default paginationBec