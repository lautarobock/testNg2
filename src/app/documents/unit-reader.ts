import * as _ from 'lodash';

class BaseReader {
    constructor(
        private unit:any,
        private labelProvider,
        private types,
        private sizes,
        private displayLabel) {}

     all() : Unit[] {
        let units = [];
        for (let i = 0; i < this.types.length; i++) {
            let type = this.unit[this.types[i]];
            for (let j = 0; j < this.sizes.length; j++) {
                let actualLabelProvider = this.labelProvider || new UnitLabelProvider(type);
                let display = actualLabelProvider.label(this.sizes[j]);
                let factor = type[this.sizes[j] + 'Factor'];
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

    unique() : Unit[] {
        return _.uniqBy(this.all(), 'display');
    }   
}

export class Unit {
    constructor(
        public display: string,
        public factor: number,
        public type: string,
        public size: string
    ) {}
}

export class UnitReader extends BaseReader {

    constructor(
        unit:any,
        labelProvider = null,
        types = ['imperial', 'metric', 'continental'],
        sizes = ['small', 'medium', 'large'],
        displayLabel = 'Display'
    ) {
        super(unit,labelProvider,types,sizes,displayLabel);
    }
}

class UnitLabelProvider {

    constructor(private labels: any) {}

    label(size) {
        return this.labels[size+'Display'];
    }
}

export class CurrencyReader extends BaseReader {

    constructor(
        unit:any,
        labelProvider,
        types = ['imperial'],
        sizes = ['small', 'medium', 'large'],
        displayLabel = 'CurrencyLabel'
    ) {
        super(unit,labelProvider,types,sizes,displayLabel);
    }
}
