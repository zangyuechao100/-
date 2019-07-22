const paginationBec = Behavior({
  data: {
    dataArray: [],
    total: null,
    nodeResult: false
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
      if (total === 0) {
        this.setData({
          nodeResult: true
        })
      }
    },

    initialize () {
      this.setData({
        total: null,
        nodeResult: false,
        dataArray: []
      })
    }
  }
})
  
export default paginationBec