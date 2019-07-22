const paginationBec = Behavior({
  data: {
    dataArray: [],
    total: null,
    nodeResult: false,
    loading: false
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
        loading: false,
        dataArray: []
      })
    },

    isLocked () {
      return this.data.loading
    },

    locked () {
      this.setData({
        loading: true
      })
    },

    unLocked () {
      this.setData({
        loading: false
      })
    }
  }
})
  
export default paginationBec