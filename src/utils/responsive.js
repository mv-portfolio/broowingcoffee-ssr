const {innerHeight: height, innerWidth: width} = window;

const hp = hp => (hp / 100) * height;
const wp = wp => (wp / 100) * width;

export {height, width, hp, wp};
