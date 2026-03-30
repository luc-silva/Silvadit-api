import { createUserDetailsData, createUserDetailsRaw } from "test/mock/data/user"
import { UserAssembler } from "~/api/user/utils/user.assemble"

describe("UserAssembler" , () => {
  it("Should assemble into user correctly" , () => {
    const rawUserDetails = createUserDetailsRaw()
    const expected = createUserDetailsData()

    const result = UserAssembler.assemble(rawUserDetails)

    expect(result).toEqual(expected)
  })
})