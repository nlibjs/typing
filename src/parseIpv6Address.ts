import {
	COLON,
	DIGIT_NINE,
	DIGIT_ZERO,
	FULL_STOP,
	LATIN_CAPITAL_LETTER_A,
	LATIN_CAPITAL_LETTER_F,
	LATIN_SMALL_LETTER_A,
} from "./codePoints.ts";
import { isHexCodePoint, listCodePoints } from "./codePointUtil.ts";
import { listIpv4Octets } from "./parseIpv4Address.ts";

/**
 * Represents a group of an IPv6 address.
 * @see https://tools.ietf.org/html/rfc5952
 */
export interface Ipv6AddressGroup {
	value: number | null;
	start: number;
	end: number;
}

/**
 * Represents the groups of an IPv6 address.
 */
export type Ipv6AddressGroups = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
];

/**
 * Converts a code point to a number.
 * @param codePoint - The code point to convert.
 * @returns The number.
 */
const toNumber = (codePoint: number): number => {
	if (codePoint <= DIGIT_NINE) {
		return codePoint - DIGIT_ZERO;
	}
	if (codePoint <= LATIN_CAPITAL_LETTER_F) {
		return 10 + codePoint - LATIN_CAPITAL_LETTER_A;
	}
	return 10 + codePoint - LATIN_SMALL_LETTER_A;
};

/**
 * Lists the groups of an IPv6 address.
 * @param input - The input string.
 * @param fromIndex - The index to start from.
 * @returns An iterator of IPv6 address groups.
 */
export const listIpv6Groups = function* (
	input: string,
	fromIndex = 0,
): Generator<Ipv6AddressGroup> {
	let start = fromIndex;
	let length = 0;
	let value = 0;
	for (const codePoint of listCodePoints(input, fromIndex)) {
		if (isHexCodePoint(codePoint)) {
			value = value * 16 + toNumber(codePoint);
			length += 1;
			if (4 < length) {
				throw new Error(`InvalidIpv6Group: ${input.substr(start, length)}`);
			}
		} else if (codePoint === FULL_STOP) {
			length = value = 0;
			let octetIndex = 0;
			for (const octet of listIpv4Octets(input, start)) {
				if (octetIndex % 2 === 0) {
					value = octet.value;
					start = octet.start;
				} else {
					yield {
						value: value * 0x100 + octet.value,
						start,
						end: octet.end,
					};
				}
				octetIndex += 1;
			}
			break;
		} else {
			if (0 < length || fromIndex < start) {
				yield {
					value: 0 < length ? value : null,
					start,
					end: start + length,
				};
			}
			start += length + 1;
			length = value = 0;
			if (codePoint !== COLON) {
				break;
			}
		}
	}
	if (0 < length) {
		yield { value, start, end: start + length };
	}
};

/**
 * Represents the result of parsing an IPv6 address.
 */
export interface Ipv6AddressParseResult {
	groups: Ipv6AddressGroups;
	start: number;
	end: number;
}

/**
 * Parses an IPv6 address.
 * @param input - The input string.
 * @param start - The index to start from.
 * @returns The result of parsing an IPv6 address.
 */
export const parseIpv6Address = (
	input: string,
	start = 0,
): Ipv6AddressParseResult => {
	const groups: Array<number> = [];
	let compressorIndex = -1;
	let end = start;
	for (const group of listIpv6Groups(input, start)) {
		const { value } = group;
		if (value === null) {
			if (7 <= groups.length) {
				throw new Error(`InvalidIpv6Address: ${input.substr(start, end)}`);
			}
			end = group.end + 1;
			if (0 <= compressorIndex) {
				throw new Error(
					`DuplicatedCompressor: ${input.slice(start, group.end)}`,
				);
			}
			compressorIndex = groups.length;
		} else {
			end = group.end;
			const length = groups.push(value);
			if (0 <= compressorIndex && length === 7) {
				groups.splice(compressorIndex, 0, 0);
				return {
					groups: groups as Ipv6AddressGroups,
					start,
					end,
				};
			}
			if (length === 8) {
				return {
					groups: groups as Ipv6AddressGroups,
					start,
					end,
				};
			}
		}
	}
	if (!(0 <= compressorIndex)) {
		throw new Error(`InvalidIpv6Address: ${input.substr(start, end)}`);
	}
	const result = groups.slice(0, compressorIndex);
	for (let count = 8 - groups.length; count--; ) {
		result.push(0);
	}
	result.push(...groups.slice(compressorIndex));
	return {
		groups: result as Ipv6AddressGroups,
		start,
		end,
	};
};
