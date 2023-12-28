function create_sideEffects_square_2() {
    Array.prototype.sideEffects_square_2 = (x) => {
        return x * x;
    }
    return (x) => {
        return x * x;
    }
}
export const sideEffects_square_2 = create_sideEffects_square_2();