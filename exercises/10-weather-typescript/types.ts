export const TYPES = {
	Application: Symbol('Application'),
	ConfigService: Symbol('ConfigService'),
	//#region Controllers
	UserController: Symbol('UserController'),
	HelpController: Symbol('HelpController'),
	CityController: Symbol('CityController'),
	LanguageController: Symbol('LanguageController'),
	WeatherController: Symbol('WeatherController'),
	//#region Handlers
	UserHandlerInterface: Symbol('UserHandlerInterface'),
	UserHandler: Symbol('UserHandler'),
	HelpHandlerInterface: Symbol('HelpHandlerInterface'),
	HelpHandler: Symbol('HelpHandler'),
	CityHandlerInterface: Symbol('CityHandlerInterface'),
	CityHandler: Symbol('CityHandler'),
	LanguageHandlerInterface: Symbol('LanguageHandlerInterface'),
	LanguageHandler: Symbol('LanguageHandler'),
	WeatherHandlerInterface: Symbol('WeatherHandlerInterface'),
	WeatherHandler: Symbol('WeatherHandler'),
	//#region Other services
	LoggerInterface: Symbol('LoggerInterface'),
	LoggerService: Symbol('LoggerService'),
	ExceptionFilterInterface: Symbol('ExceptionFilterInterface'),
	StorageServiceInterface: Symbol('StorageServiceInterface'),
	StorageService: Symbol('StorageService'),
	ApiServiceInterface: Symbol('ApiServiceInterface'),
	ApiService: Symbol('ApiService'),
};
