// 滚动鼠标翻页
document.addEventListener('wheel', (() => {
  let loading = false
  const wheel = 50
  const MaxWheel = 200
  return (e) => {
    if (e.altKey) return
    const deltaY = Math.abs(e.deltaY)
    deltaY >= MaxWheel && (loading = false)
    if (loading) return
    if (e.deltaY > wheel) {
      Slide.prev()
    } else if (e.deltaY < -wheel) {
      Slide.next()
    }
    if (MaxWheel > deltaY && deltaY > wheel) {
      loading = true
      setTimeout(() => (loading = false), 2000)
    }
  }
})())
