import * as _ from "lodash";

export class UnitReader {

    constructor(
        private unit:any,
        private labelProvider = null,
        private types = ['imperial', 'metric', 'continental'],
        private sizes = ['small', 'medium', 'large'],
        private displayLabel = 'Display') {}

    all() {
        var units = [];
        for (var i = 0; i < this.types.length; i++) {
            var type = this.unit[this.types[i]];
            for (var j = 0; j < this.sizes.length; j++) {
                var actualLabelProvider = this.labelProvider || new UnitLabelProvider(type);
                var display = actualLabelProvider.label(this.sizes[j]);
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

    unique() {
        return _.uniqBy(this.all(), 'display');
    }
}

class UnitLabelProvider {

    constructor(private labels: any) {}

    label(size) {
        return this.labels[size+'Display'];
    }
}

export class CurrencyReader {

    constructor(
        private unit:any,
        private labelProvider,
        private types = ['imperial'],
        private sizes = ['small', 'medium', 'large'],
        private displayLabel = 'CurrencyLabel'
        ) {}

    all() {
        var units = [];
        for (var i = 0; i < this.types.length; i++) {
            var type = this.unit[this.types[i]];
            for (var j = 0; j < this.sizes.length; j++) {
                var actualLabelProvider = this.labelProvider || new UnitLabelProvider(type);
                var display = actualLabelProvider.currencyLabel(this.sizes[j]);
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

    unique() {
        return _.uniqBy(this.all(), 'display');
    }
}

class BaseReader {
    constructor(
        private unit:any,
        private labelProvider,
        private types,
        private sizes,
        private displayLabel) {}

     all() {
        var units = [];
        for (var i = 0; i < this.types.length; i++) {
            var type = this.unit[this.types[i]];
            for (var j = 0; j < this.sizes.length; j++) {
                var actualLabelProvider = this.labelProvider || new UnitLabelProvider(type);
                var display = actualLabelProvider.currencyLabel(this.sizes[j]);
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

    unique() {
        return _.uniqBy(this.all(), 'display');
    }   
}