export function booleanGenerator(): boolean;

export function fakerGenerator(type: string): string;

export function integerGenerator(schemaPart: object): number;

export function mockItGenerator(schemaPart: object, globalOverrides?: {
  minItems?: number,
  maxItems?: number
}): any;

export function numberGenerator(schemaPart: object): number;

export function randomNumberGenerator(min?: number, max?: number): number;

export function stringGenerator(schemaPart: object, schemaName?: string): string;
