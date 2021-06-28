const lib = require("../../ideas/binaryGuesser")

describe("Gusser Feature", () => {
    it("should generate the next Binary Digit", () => {
        const result = lib.guessBinary(4)
        expect(result).toEqual('101')
    })
})