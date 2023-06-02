// index.ts

type DataOption = {};

type PropertyOption = {
    value: NumberConstructor;
    step: WechatMiniprogram.Component.FullProperty<NumberConstructor>;
    disabled: BooleanConstructor;
    min: WechatMiniprogram.Component.FullProperty<NumberConstructor>;
    max: WechatMiniprogram.Component.FullProperty<NumberConstructor>;
};

type MethodOption = {
    increase: () => void;
    decrease: () => void;
    confirmValueInRange: (value: number) => number;
};

type CustomInstanceProperty = {
    lastValue: number;
};

export default Component<DataOption, PropertyOption, MethodOption, CustomInstanceProperty>({

    externalClasses: [
        'class',
        'disabled-class',
        'button-class',
        'disabled-button-class',
        'input-class',
        'disabled-input-class',
    ],

    options: {
        virtualHost: true,
    },

    /**
     * Component properties
     */
    properties: {
        value: Number,
        step: {
            type: Number,
            value: 1,
        },
        disabled: Boolean,
        min: {
            type: Number,
            value: 0,
        },
        max: {
            type: Number,
            value: Infinity,
        },
    },

    /**
     * Component initial data
     */
    data: {},

    /**
     * Component methods
     */
    methods: {
        increase(): void {
            if (this.data.disabled) {
                return;
            }
            this.setData({value: this.data.value + this.data.step});
        },

        decrease(): void {
            if (this.data.disabled) {
                return;
            }
            this.setData({value: this.data.value - this.data.step});
        },

        confirmValueInRange(value: number): number {
            const min = Math.min(this.data.min, this.data.max);
            const max = Math.max(this.data.min, this.data.max);
            if (value < min) {
                return min;
            }
            if (value > max) {
                return max;
            }
            return value;
        },
    },

    lifetimes: {
        attached: function (): void {
            this.setData({value: this.confirmValueInRange(this.data.value)});
        },
    },

    observers: {
        value: function (value: number): void {
            value = this.confirmValueInRange(value);
            if (value !== this.lastValue) {
                this.triggerEvent('change', {
                    value: this.data.value,
                    lastValue: this.lastValue,
                });
                this.lastValue = value;
            }
            if (value !== this.data.value) {
                wx.nextTick(() => this.setData({value}));
            }
        },
    },
});
