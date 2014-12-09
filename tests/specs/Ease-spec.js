describe('Ease', function() {

  describe('Linear', function() {
    it('should return Linear easing values', function() {

      expect(Ease.Linear(0, 0, 1)).toBe(0);
      expect(Ease.Linear(0.5, 0, 1)).toBe(0.5);
      expect(Ease.Linear(1, 0, 1)).toBe(1);
    });
  });

  describe('QuadIn', function() {
    it('should return QuadIn easing values', function() {
      expect(Ease.QuadIn(0, 0, 1)).toBe(0);
      expect(Ease.QuadIn(0.5, 0, 1)).toBe(0.25);
      expect(Ease.QuadIn(1, 0, 1)).toBe(1);
    });
  });

  describe('QuadOut', function() {
    it('should return QuadOut easing values', function() {
      expect(Ease.QuadOut(0, 0, 1)).toBe(0);
      expect(Ease.QuadOut(0.5, 0, 1)).toBe(0.75);
      expect(Ease.QuadOut(1, 0, 1)).toBe(1);
    });
  });

  describe('QuadInOut', function() {
    it('should return QuadInOut easing values', function() {
      expect(Ease.QuadInOut(0, 0, 1)).toBe(0);
      expect(Ease.QuadInOut(0.25, 0, 1)).toBe(0.125);
      expect(Ease.QuadInOut(0.75, 0, 1)).toBe(0.875);
      expect(Ease.QuadInOut(1, 0, 1)).toBe(1);
    });
  });

  describe('CubicIn', function() {
    it('should return CubicIn easing values', function() {
      expect(Ease.CubicIn(0, 0, 1)).toBe(0);
      expect(Ease.CubicIn(0.5, 0, 1)).toBe(0.125);
      expect(Ease.CubicIn(1, 0, 1)).toBe(1);
    });
  });

  describe('CubicOut', function() {
    it('should return CubicOut easing values', function() {
      expect(Ease.CubicOut(0, 0, 1)).toBe(0);
      expect(Ease.CubicOut(0.5, 0, 1)).toBe(0.875);
      expect(Ease.CubicOut(1, 0, 1)).toBe(1);
    });
  });

  describe('CubicInOut', function() {
    it('should return CubicInOut easing values', function() {
      expect(Ease.CubicInOut(0, 0, 1)).toBe(0);
      expect(Ease.CubicInOut(0.25, 0, 1)).toBe(0.0625);
      expect(Ease.CubicInOut(0.75, 0, 1)).toBe(0.9375);
      expect(Ease.CubicInOut(1, 0, 1)).toBe(1);
    });
  });

  describe('QuartIn', function() {
    it('should return QuartIn easing values', function() {
      expect(Ease.QuartIn(0, 0, 1)).toBe(0);
      expect(Ease.QuartIn(0.5, 0, 1)).toBe(0.0625);
      expect(Ease.QuartIn(1, 0, 1)).toBe(1);
    });
  });

  describe('QuartOut', function() {
    it('should return QuartOut easing values', function() {
      expect(Ease.QuartOut(0, 0, 1)).toBe(0);
      expect(Ease.QuartOut(0.5, 0, 1)).toBe(0.9375);
      expect(Ease.QuartOut(1, 0, 1)).toBe(1);
    });
  });

  describe('QuartInOut', function() {
    it('should return QuartInOut easing values', function() {
      expect(Ease.QuartInOut(0, 0, 1)).toBe(0);
      expect(Ease.QuartInOut(0.25, 0, 1)).toBe(0.03125);
      expect(Ease.QuartInOut(0.75, 0, 1)).toBe(0.96875);
      expect(Ease.QuartInOut(1, 0, 1)).toBe(1);
    });
  });

  describe('QuintIn', function() {
    it('should return QuintIn easing values', function() {
      expect(Ease.QuintIn(0, 0, 1)).toBe(0);
      expect(Ease.QuintIn(0.5, 0, 1)).toBe(0.03125);
      expect(Ease.QuintIn(1, 0, 1)).toBe(1);
    });
  });

  describe('QuintOut', function() {
    it('should return QuintOut easing values', function() {
      expect(Ease.QuintOut(0, 0, 1)).toBe(0);
      expect(Ease.QuintOut(0.5, 0, 1)).toBe(0.96875);
      expect(Ease.QuintOut(1, 0, 1)).toBe(1);
    });
  });

  describe('QuintInOut', function() {
    it('should return QuintInOut easing values', function() {
      expect(Ease.QuintInOut(0, 0, 1)).toBe(0);
      expect(Ease.QuintInOut(0.25, 0, 1)).toBe(0.015625);
      expect(Ease.QuintInOut(0.75, 0, 1)).toBe(0.984375);
      expect(Ease.QuintInOut(1, 0, 1)).toBe(1);
    });
  });

  describe('SineIn', function() {
    it('should return SineIn easing values', function() {
      expect(Ease.SineIn(0, 0, 1)).toBe(0);
      expect(Ease.SineIn(0.5, 0, 1)).toBeCloseTo(0.2928932188134524);
      expect(Ease.SineIn(1, 0, 1)).toBeCloseTo(1);
    });
  });

  describe('SineOut', function() {
    it('should return SineOut easing values', function() {
      expect(Ease.SineOut(0, 0, 1)).toBe(0);
      expect(Ease.SineOut(0.5, 0, 1)).toBeCloseTo(0.7071067811865475);
      expect(Ease.SineOut(1, 0, 1)).toBe(1);
    });
  });

  describe('SineInOut', function() {
    it('should return SineInOut easing values', function() {
      expect(Ease.SineInOut(0, 0, 1)).toBe(0);
      expect(Ease.SineInOut(0.25, 0, 1)).toBeCloseTo(0.1464466094067262);
      expect(Ease.SineInOut(0.75, 0, 1)).toBeCloseTo(0.8535533905932737);
      expect(Ease.SineInOut(1, 0, 1)).toBe(1);
    });
  });

  describe('ExpoIn', function() {
    it('should return ExpoIn easing values', function() {
      expect(Ease.ExpoIn(0, 0, 1)).toBe(0);
      expect(Ease.ExpoIn(0.5, 0, 1)).toBe(0.03125);
      expect(Ease.ExpoIn(1, 0, 1)).toBe(1);
    });
  });

  describe('ExpoOut', function() {
    it('should return ExpoOut easing values', function() {
      expect(Ease.ExpoOut(0, 0, 1)).toBe(0);
      expect(Ease.ExpoOut(0.5, 0, 1)).toBe(0.96875);
      expect(Ease.ExpoOut(1, 0, 1)).toBe(1);
    });
  });

  describe('ExpoInOut', function() {
    it('should return ExpoInOut easing values', function() {
      expect(Ease.ExpoInOut(0, 0, 1)).toBe(0);
      expect(Ease.ExpoInOut(0.25, 0, 1)).toBe(0.015625);
      expect(Ease.ExpoInOut(0.75, 0, 1)).toBe(0.984375);
      expect(Ease.ExpoInOut(1, 0, 1)).toBe(1);
    });
  });

  describe('CircIn', function() {
    it('should return CircIn easing values', function() {
      expect(Ease.CircIn(0, 0, 1)).toBe(0);
      expect(Ease.CircIn(0.5, 0, 1)).toBeCloseTo(0.1339745962155614);
      expect(Ease.CircIn(1, 0, 1)).toBe(1);
    });
  });

  describe('CircOut', function() {
    it('should return CircOut easing values', function() {
      expect(Ease.CircOut(0, 0, 1)).toBe(0);
      expect(Ease.CircOut(0.5, 0, 1)).toBeCloseTo(0.8660254037844386);
      expect(Ease.CircOut(1, 0, 1)).toBe(1);
    });
  });

  describe('CircInOut', function() {
    it('should return CircInOut easing values', function() {
      expect(Ease.CircInOut(0, 0, 1)).toBe(0);
      expect(Ease.CircInOut(0.25, 0, 1)).toBeCloseTo(0.0669872981077807);
      expect(Ease.CircInOut(0.75, 0, 1)).toBeCloseTo(0.9330127018922193);
      expect(Ease.CircInOut(1, 0, 1)).toBe(1);
    });
  });

  describe('ElasticIn', function() {
    it('should return ElasticIn easing values', function() {
      expect(Ease.ElasticIn(0, 0, 1)).toBe(0);
      expect(Ease.ElasticIn(0.5, 0, 1)).toBeCloseTo(-0.015625);
      expect(Ease.ElasticIn(0.5, 0, -1)).toBeCloseTo(0.015625);
      expect(Ease.ElasticIn(1, 0, 1)).toBe(1);
    });
  });

  describe('ElasticOut', function() {
    it('should return ElasticOut easing values', function() {
      expect(Ease.ElasticOut(0, 0, 1)).toBe(0);
      expect(Ease.ElasticOut(0.5, 0, 1)).toBe(1.015625);
      expect(Ease.ElasticOut(0.5, 0, -1)).toBe(-1.015625);
      expect(Ease.ElasticOut(1, 0, 1)).toBe(1);
    });
  });

  describe('ElasticInOut', function() {
    it('should return ElasticInOut easing values', function() {
      expect(Ease.ElasticInOut(0, 0, 1)).toBe(0);
      expect(Ease.ElasticInOut(0.25, 0, 1)).toBeCloseTo(0.011969444423734);
      expect(Ease.ElasticInOut(0.5, 0, -1)).toBeCloseTo(-0.5);
      expect(Ease.ElasticInOut(0.75, 0, 1)).toBeCloseTo(0.988030555576266);
      expect(Ease.ElasticInOut(1, 0, 1)).toBe(1);
    });
  });

  describe('BounceIn', function() {
    it('should return BounceIn easing values', function() {
      expect(Ease.BounceIn(0, 0, 1)).toBe(0);
      expect(Ease.BounceIn(0.5, 0, 1)).toBe(0.234375);
      expect(Ease.BounceIn(1, 0, 1)).toBe(1);
    });
  });

  describe('BounceOut', function() {
    it('should return BounceOut easing values', function() {
      expect(Ease.BounceOut(0, 0, 1)).toBe(0);
      expect(Ease.BounceOut(0.5, 0, 1)).toBe(0.765625);
      expect(Ease.BounceOut(0.8, 0, 1)).toBe(0.94);
      expect(Ease.BounceOut(1, 0, 1)).toBe(1);
    });
  });

  describe('BounceInOut', function() {
    it('should return BounceInOut easing values', function() {
      expect(Ease.BounceInOut(0, 0, 1)).toBe(0);
      expect(Ease.BounceInOut(0.25, 0, 1)).toBe(0.1171875);
      expect(Ease.BounceInOut(0.75, 0, 1)).toBe(0.8828125);
      expect(Ease.BounceInOut(1, 0, 1)).toBe(1);
    });
  });

});
