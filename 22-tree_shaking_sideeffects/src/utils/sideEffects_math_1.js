function create_sideEffects_square_1() {
    Array.prototype.sideEffects_square_1 = (x) => {
        return x * x;
    }
    return (x) => {
        return x * x;
    }
}
export const sideEffects_square_1 = create_sideEffects_square_1();