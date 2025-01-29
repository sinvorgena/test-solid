export function createDoubleTapPreventer(timeoutMs: number) {
	let doubleTapTimer: NodeJS.Timeout;
	let doubleTapPressed = false

	return (e: TouchEvent) => {
		clearTimeout(doubleTapTimer)
		if (doubleTapPressed) {
			e.preventDefault()
			doubleTapPressed = false
		} else {
			doubleTapPressed = true
			doubleTapTimer = setTimeout(() => {
				doubleTapPressed = false
			}, timeoutMs)
		}
	}
}

export const sleep = (delay: number) =>
	new Promise((res) => {
		setTimeout(res, delay)
	})


	export const formatCurrencyByDigits = (num: number) => {
		const formatNumber = (value: number, suffix: string): string => {
			const [integer, decimal] = value.toString().split('.')
	
			return `${integer}${decimal?.length ? `.${decimal.slice(0, 2)}` : ''}${suffix}`
		}
	
		if (num >= 1_000_000_000_000) {
			return formatNumber(num / 1_000_000_000_000, 'T')
		}
		if (num >= 1_000_000_000) {
			return formatNumber(num / 1_000_000_000, 'B')
		}
		if (num >= 1_000_000) {
			return formatNumber(num / 1_000_000, 'M')
		}
		if (num >= 1_000) {
			return formatNumber(num / 1_000, 'k')
		}
	
		return num.toString()
	}