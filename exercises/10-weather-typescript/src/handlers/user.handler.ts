// import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from '../../../9-weather-api/src/services/storage.service.js';
// import {logLanguageDict} from '../../../9-weather-api/src/dictionaries/log.language.dictionary.js';

const handleLogin = async (reqBody: {
	token: string;
}): Promise<{ success: boolean; message: string }> => {
	// const langKey = await getKeyValue(TOKEN_DICTIONARY.language)
	// if (!reqBody.token) {
	//     throw Error(logLanguageDict[langKey].tokenEmptyForLogin);
	// }
	//
	// await saveKeyValue(TOKEN_DICTIONARY.token, reqBody.token);

	return {
		success: true,
		message: 'Временной сообщение',
	};
};

export { handleLogin };
