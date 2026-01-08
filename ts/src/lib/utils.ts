import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*export class Option {
    val: Boolean;
    constructor(val: Boolean = false){
        this.val = val;
    }
    get(){
        return this.val;
    }
    set(val: Boolean){
        this.val = val;
    }
    toggle() {
        this.val = !this.val;
    }
}*/