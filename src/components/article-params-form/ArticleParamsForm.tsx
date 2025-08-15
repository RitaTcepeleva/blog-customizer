import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef, FormEvent } from 'react';
import { useOutsideClick } from './hooks/useOutsideClick';

type ArticleParamsFormProps = {
	settings: ArticleStateType;
	onSettingsChange: (newSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	settings,
	onSettingsChange,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideBlock = useRef<HTMLDivElement>(null);
	const [cashedSettings, setCashedSettings] =
		useState<ArticleStateType>(settings);

	function handleFontFamilyChange(option: OptionType) {
		setCashedSettings({ ...cashedSettings, fontFamilyOption: option });
	}

	function handleFontSizeChange(option: OptionType) {
		setCashedSettings({ ...cashedSettings, fontSizeOption: option });
	}

	function handleFontColorChange(option: OptionType) {
		setCashedSettings({ ...cashedSettings, fontColor: option });
	}

	function handleBackgroundColorChange(option: OptionType) {
		setCashedSettings({ ...cashedSettings, backgroundColor: option });
	}

	function handleContentWidthChange(option: OptionType) {
		setCashedSettings({ ...cashedSettings, contentWidth: option });
	}

	function handleSumbit(event: FormEvent) {
		event.preventDefault();
		onSettingsChange({ ...cashedSettings });
	}

	function handleClean() {
		setCashedSettings({ ...defaultArticleState });
		onSettingsChange({ ...defaultArticleState });
	}

	useOutsideClick({
		isOpenElement: isOpen,
		elementRef: asideBlock,
		onClose: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideBlock}>
				<form
					className={styles.form}
					onSubmit={handleSumbit}
					onReset={handleClean}>
					<Text uppercase={true} size={31} as={'h2'} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={cashedSettings.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						options={fontSizeOptions}
						name={'fontSize'}
						selected={cashedSettings.fontSizeOption}
						title={'Размер шрифта'}
						onChange={handleFontSizeChange}
					/>
					<Select
						selected={cashedSettings.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						selected={cashedSettings.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						selected={cashedSettings.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
