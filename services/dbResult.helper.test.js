const {hasResult} = require('./dbResult.helper')
test('rowCount > 0 → true', async () => { 
    expect(hasResult(1)).toBe(true)
 })

 test('rowCount = 0 → false', async () => { 
    expect(hasResult(0)).toBe(false)
 })