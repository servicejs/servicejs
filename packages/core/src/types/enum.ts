/**
 * Enum types, particularly useful for lists of keys
 */

export type KeyMap<K, M> = Pick<M, Extract<K, keyof M>>;

// Create an EnumType as type MyEnumType = typeof MyEnum
// The Keys of the Enum as a sum type
export type EnumKeys<EnumType> = keyof EnumType;
// The actual inspectable mapping of the enum type
export type EnumMap<EnumType> = KeyMap<EnumKeys<EnumType>, EnumType>;
export type EnumRecord<EnumType, T> = Record<EnumKeys<EnumType>, T>;

export type MissingKeys<EnumType, Interface> = Exclude<EnumKeys<EnumType>, keyof Interface>;
// This will cause type checking to fail if properties were omitted
export type MissingKeysRecord<EnumType, Interface, T = never> = MissingKeys<EnumType, Interface> extends never
  ? unknown
  : never;
// Record<MissingKeys<EnumType, Interface>, T>;
export type PresentKeys<EnumType, Interface> = Extract<EnumKeys<EnumType>, keyof Interface>;
export type PresentKeysRecord<EnumType, Interface, T = unknown> = Record<PresentKeys<EnumType, Interface>, T>;

// prettier-ignore
export type EnumTypeMap<EnumType, Interface> =
    & MissingKeysRecord<EnumType, Interface>
    & PresentKeysRecord<EnumType, Interface>
    & { [K in keyof Interface]: Interface[K] };
