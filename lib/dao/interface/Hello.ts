import { Hello } from '../model/Hello.js';
import { loggerErr } from '../../utils/logger.js';

export async function setKeyValue({ key, value }) {
    try {
        const item = await Hello.findOne({
            where: {
                key
            }
        });

        if (!item) {
            await Hello.create({ key, value });
        } else {
            item.value = value;
            await item.save();
        }

        return true;
    } catch (error) {
        loggerErr.error('setKeyValue:', error);
        return false;
    }
}

export async function getValueFromKey(key: string) {
    try {
        const item = await Hello.findOne({
            where: {
                key
            }
        });

        return item;
    } catch (error) {
        loggerErr.error('setKeyValue:', error);
        return null;
    }
}
