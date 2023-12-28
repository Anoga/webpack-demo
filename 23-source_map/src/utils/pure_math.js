export function pure_cube(x) {
    return x * x * x;
}

function create_pure_square() {
    Array.prototype.pure_square = (x) => {
        return x * x;
    }
    return (x) => {
        return x * x;
    }
}
export const pure_square = /*#__PURE__*/ create_pure_square();

