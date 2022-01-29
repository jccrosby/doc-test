export const add = (...args: number[]) => {
    return args.reduce((prev, curr) => prev + curr);
};

export default {
    add,
};
