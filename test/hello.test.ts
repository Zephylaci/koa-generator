import hello from "../lib/api/hello";

test("hello test", () => {
    let ctx = {};
    expect(hello.contrl(ctx)).toEqual({
        body: "hello",
    });
});
