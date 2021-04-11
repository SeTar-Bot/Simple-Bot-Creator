module.exports = {
    pad: function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      },
      msToDate: function(s, isMs)
      {
        if(isMs)
        {
            var ms = s % 1000;
            s = (s - ms) / 1000;
        }
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        return module.exports.pad(hrs) + ':' + module.exports.pad(mins) + ':' + module.exports.pad(secs);
      }
};
