import { FULL_STOP, DIGIT_ZERO } from "./codePoints.ts";
import { isDigitCodePoint, listCodePoints } from "./codePointUtil.ts";

export interface Ipv4AddressOctet {
	value: number;
	start: number;
	end: number;
}

export const listIpv4Octets = function* (
	input: string,
	fromIndex = 0,
): Generator<Ipv4AddressOctet> {
	let start = fromIndex;
	let length = 0;
	let value = 0;
	for (const codePoint of listCodePoints(input, fromIndex)) {
		if (isDigitCodePoint(codePoint)) {
			if (0 < length && value === 0) {
				throw new Error(`InvalidIpv4Octet: ${input.substr(start, length)}`);
			}
			value = value * 10 + codePoint - DIGIT_ZERO;
			length += 1;
			if (255 < value || 3 < length) {
				throw new Error(`InvalidIpv4Octet: ${input.substr(start, length)}`);
			}
		} else {
			if (0 < length) {
				yield { value, start, end: start + length };
			}
			start += length + 1;
			length = value = 0;
			if (codePoint !== FULL_STOP) {
				break;
			}
		}
	}
	if (0 < length) {
		yield { value, start, end: start + length };
	}
};

export interface Ipv4AddressParseResult {
	octets: [number, number, number, number];
	start: number;
	end: number;
}

export const parseIpv4Address = (
	input: string,
	start = 0,
): Ipv4AddressParseResult => {
	const octets: Array<number> = [];
	for (const octet of listIpv4Octets(input, start)) {
		if (octets.push(octet.value) === 4) {
			return {
				octets: octets as [number, number, number, number],
				start,
				end: octet.end,
			};
		}
	}
	throw new Error(`InvalidIpv4Address: ${input.substr(start, 15)}`);
};
