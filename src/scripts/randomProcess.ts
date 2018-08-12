export default function run(arg: any, fn: Function) {

  console.log('child running', arg);
  fn('foo');

}
