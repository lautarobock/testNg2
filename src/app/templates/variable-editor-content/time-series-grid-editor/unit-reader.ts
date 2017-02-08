export class UnitReader {

    // private types = ['imperial', 'metric', 'continental'];
    // private sizes = ['small', 'medium', 'large'];
    // private displayLabel = 'Display';
    // private labelProvider = null;

    constructor(
        private unit:any,
        private types = ['imperial', 'metric', 'continental'],
        private sizes = ['small', 'medium', 'large'],
        private displayLabel = 'Display',
        private labelProvider = null) {}

    all() {
        var units = [];
        for (var i = 0; i < this.types.length; i++) {
            var type = this.unit[this.types[i]];
            for (var j = 0; j < this.sizes.length; j++) {
                var actualLabelProvider = this.labelProvider || type;
                var display = actualLabelProvider[this.sizes[j] + this.displayLabel];
                var factor = type[this.sizes[j] + 'Factor'];
                units.push({
                    display: display,
                    factor: factor,
                    type: type,
                    size: this.sizes[j]
                });
            }
        }
        return units;
    }
}
