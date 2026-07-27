import { DataToppings } from "./data-toppings";

export namespace PizzaToppingBanks {
    const manifest = {
        Default: ["Mushroom", "GreenPepper", "Tomato", "Onion"],
        Sweetzza: ["Pineapple", "MandarinOrange", "Kiwi", "Strawberry"],
    } satisfies Record<string, DataToppings.Id[]>;

    export type Id = keyof typeof manifest;

    export interface Model {
        unlock(id: Id): void;
        swap(): void;
        readonly current: DataToppings.Id[];
        readonly next: DataToppings.Id[];
    }

    export function create(): Model {
        const unlockedBankIds = new Array<Id>("Default");
        let currentIndex = 0;

        return {
            unlock(id: Id) {
                if (unlockedBankIds.includes(id)) {
                    return;
                }

                unlockedBankIds.push(id);
            },
            get current() {
                return manifest[unlockedBankIds[currentIndex]];
            },
            get next() {
                return manifest[unlockedBankIds[(currentIndex + 1) % unlockedBankIds.length]];
            },
            swap() {
                currentIndex = (currentIndex + 1) % unlockedBankIds.length;
            },
        };
    }
}
