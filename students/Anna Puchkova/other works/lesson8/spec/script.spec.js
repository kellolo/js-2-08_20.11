const script = require('../script');
const multiplication = script.multiplication;
const addition = script.addition;
const difference = script.difference;
const division = script.division;

describe('Функция addition()', () => {
    it('должна возвращать 5 при аргументах (3, 2)', () => {
        expect(addition(3, 2)).toBe(5);
      });
    it('должна возвращать null при аргументах (null, 2)', () => {
    expect(addition(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(addition(2, null)).toBeNull();
        });
    it('должна возвращать null при аргументах (2, "test")', () => {
        expect(addition(2, 'test')).toBeNull();
        });
    it('должна возвращать null при аргументах ("test", 2)', () => {
        expect(addition('test', 2)).toBeNull();
        });
    it('должна возвращать null при аргументах (2, undefined)', () => {
        expect(addition(2, undefined)).toBeNull();
        });
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(addition(undefined, 2)).toBeNull();
        });
    it('должна возвращать 5 при аргументах (0, 5)', () => {
        expect(addition(0, 5)).toBe(5);
        });
    it('должна возвращать 5 при аргументах (5, 0)', () => {
        expect(addition(5, 0)).toBe(5);
        });
    it('должна возвращать -5 при аргументах (-5, 0)', () => {
        expect(addition(-5, 0)).toBe(-5);
        });
    it('должна возвращать -7 при аргументах (-5, -2)', () => {
        expect(addition(-5, -2)).toBe(-7);
        });
  });

  describe('Функция difference()', () => {
    it('должна возвращать 1 при аргументах (3, 2)', () => {
        expect(difference(3, 2)).toBe(1);
      });
    it('должна возвращать null при аргументах (null, 2)', () => {
    expect(difference(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(difference(2, null)).toBeNull();
        });
    it('должна возвращать null при аргументах (2, "test")', () => {
        expect(difference(2, 'test')).toBeNull();
        });
    it('должна возвращать null при аргументах ("test", 2)', () => {
        expect(difference('test', 2)).toBeNull();
        });
    it('должна возвращать null при аргументах (2, undefined)', () => {
        expect(difference(2, undefined)).toBeNull();
        });
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(difference(undefined, 2)).toBeNull();
        });
    it('должна возвращать -5 при аргументах (0, 5)', () => {
        expect(difference(0, 5)).toBe(-5);
        });
    it('должна возвращать 5 при аргументах (5, 0)', () => {
        expect(difference(5, 0)).toBe(5);
        });
    it('должна возвращать -5 при аргументах (-5, 0)', () => {
        expect(difference(-5, 0)).toBe(-5);
        });
    it('должна возвращать -3 при аргументах (-5, -2)', () => {
        expect(difference(-5, -2)).toBe(-3);
        });
  });

  describe('Функция division()', () => {
    it('должна возвращать 2 при аргументах (4, 2)', () => {
        expect(division(4, 2)).toBe(2);
      });
    it('должна возвращать null при аргументах (null, 2)', () => {
    expect(division(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(division(2, null)).toBeNull();
        });
    it('должна возвращать null при аргументах (2, "test")', () => {
        expect(division(2, 'test')).toBeNull();
        });
    it('должна возвращать null при аргументах ("test", 2)', () => {
        expect(division('test', 2)).toBeNull();
        });
    it('должна возвращать null при аргументах (2, undefined)', () => {
        expect(division(2, undefined)).toBeNull();
        });
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(division(undefined, 2)).toBeNull();
        });
    it('должна возвращать 0 при аргументах (0, 5)', () => {
        expect(division(0, 5)).toBe(0);
        });
    it('должна возвращать null при аргументах (5, 0)', () => {
        expect(division(5, 0)).toBeNull();
        });
    it('должна возвращать -5 при аргументах (-25, 5)', () => {
        expect(division(-25, 5)).toBe(-5);
        });
    it('должна возвращать -5 при аргументах (25, -5)', () => {
        expect(division(25, -5)).toBe(-5);
        });
    it('должна возвращать -25 при аргументах (25, -1)', () => {
        expect(division(25, -1)).toBe(-25);
        });
  });

  describe('Функция multiplication()', () => {
    it('должна возвращать 8 при аргументах (4, 2)', () => {
        expect(multiplication(4, 2)).toBe(8);
      });
    it('должна возвращать null при аргументах (null, 2)', () => {
    expect(multiplication(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(multiplication(2, null)).toBeNull();
        });
    it('должна возвращать null при аргументах (2, "test")', () => {
        expect(multiplication(2, 'test')).toBeNull();
        });
    it('должна возвращать null при аргументах ("test", 2)', () => {
        expect(multiplication('test', 2)).toBeNull();
        });
    it('должна возвращать null при аргументах (2, undefined)', () => {
        expect(multiplication(2, undefined)).toBeNull();
        });
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(multiplication(undefined, 2)).toBeNull();
        });
    it('должна возвращать 0 при аргументах (0, 5)', () => {
        expect(multiplication(0, 5)).toBe(0);
        });
    it('должна возвращать null при аргументах (5, 0)', () => {
        expect(multiplication(5, 0)).toBe(0);
        });
    it('должна возвращать -25 при аргументах (-5, 5)', () => {
        expect(multiplication(-5, 5)).toBe(-25);
        });
    it('должна возвращать -25 при аргументах (5, -5)', () => {
        expect(multiplication(5, -5)).toBe(-25);
        });
    it('должна возвращать 25 при аргументах (25, -1)', () => {
        expect(multiplication(25, -1)).toBe(-25);
        });
  });