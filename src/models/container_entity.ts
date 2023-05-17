export enum ESysErrorCode {
	CRASH = '500',
	SUCCESS = '200',
	ERROR = '999',
	WARNING = '99',
	INFO = '9',
}
export interface InterfaceBaseEntity<T> {
	message: string
	success: boolean
	code: ESysErrorCode
	data: T
}

export class BaseEntity<T> {
	/**
	 * 操作结果
	 *
	 * @type {boolean}
	 * @memberof BaseEntity
	 */
	success: boolean = true

	/**
	 * 描述信息
	 *
	 * @type {string}
	 * @memberof BaseEntity
	 */
	message: string = ''

	/**
	 * 提示信息编码
	 *
	 * @type {(string|number)}
	 * @memberof BaseEntity
	 */
	code: string | number = ''

	/**
	 * 返回数据信息
	 *
	 * @type {T}
	 * @memberof BaseEntity
	 */
    //@ts-ignore
	data: T = null
}
export class ContainerEntity<T> extends BaseEntity<T> {
	// tslint:disable-next-line: typedef
	constructor(result?: InterfaceBaseEntity<T>) {
		super()
		if (result && typeof result === 'object') {
			this.code = result.code || ''
			this.message = result.message || ''
			this.success = result.success || false
			this.data = result.data
		}
	}
}