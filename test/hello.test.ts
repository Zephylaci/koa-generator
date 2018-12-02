import hello from '../src/api/hello';

test('hello test', () => {
    let ctx ={};
    expect(hello.contrl(ctx)).toEqual({
        body:'hello'
    });
});