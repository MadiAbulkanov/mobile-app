
# mvp (Expo) — TypeScript

Минимальная структура React Native (Expo) с TypeScript для запуска через Expo Go.

## Что сделано
- Добавлены базовые файлы: `package.json`, `App.tsx`, `app.json`, `babel.config.js`, `tsconfig.json`, `.gitignore`.
- Создана папка `assets/` для картинок/иконок.

## Как запустить (Windows PowerShell)
1. Откройте PowerShell и перейдите в папку проекта:

```powershell
cd "c:\Users\User\Desktop\mob app\mvp"
```

2. Установите зависимости:

```powershell
npm install
```

3. Запустите Expo Metro bundler (используем npx, чтобы не требовать глобальной установки):

```powershell
npx expo start
```

4. Отсканируйте QR-код в терминале с приложением Expo Go (iOS/Android) или используйте эмулятор.

Примечания:
- Если вы предпочитаете глобальную установку: `npm install -g expo-cli`, затем `expo start`.
- В проект добавлены `typescript` и типы для React / React Native; `tsconfig.json` настроен для React Native.
- Если вы видите ошибки типов при разработке — выполните `npm install` и перезапустите Metro.

Если хотите — могу автоматически запустить `npm install` и проверить, что проект стартует локально — дайте знать и я выполню команды в терминале.
