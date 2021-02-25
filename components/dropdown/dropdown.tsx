import React, { useEffect, useState, createRef } from "react"
import styles from "./dropdown.module.scss"
import { Item } from "../../pages"
import { List } from "./list"

interface DropdownProps {
	label: string
	items: Item[]
	/**
	 * Optionally set initial item
	 */
	selectedItem: Item
	changeSelected: (item: Item) => void
}

const Dropdown: React.FC<DropdownProps> = ({
	label,
	items,
	selectedItem,
	changeSelected,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const listRef = createRef<HTMLUListElement>()

	useEffect(() => {
		const ref = listRef.current
		/**
		 * Check that the ref is not null (defined when the UL is present in the DOM)
		 * and that the isOpen === true
		 */
		if (ref && isOpen) {
			/**
			 * As the list opens and both conditions are met, shift focus from the button to the UL.
			 * tabIndex will need to be manually set to zero for this to be possible
			 */
			ref.focus()
		}
	}, [isOpen])

	const handleIsOpen = (open: boolean) => {
		setIsOpen(open)
	}

	return (
		<div className={styles["container"]}>
			<span id='list-label'>{label}</span>
			<div className={styles["wrapper"]}>
				<button
					aria-haspopup='listbox'
					aria-expanded={isOpen}
					aria-labelledby='list-label'
					onClick={() => setIsOpen(!isOpen)}
				>
					{selectedItem?.name}
				</button>
				<ul
					className={[
						[styles["listbox"]],
						[isOpen ? styles["hidden"] : ""],
					].join(" ")}
					role='listbox'
					ref={listRef}
					/**
					 * tabIndex will need to be manually set here such that it can be focused
					 */
					tabIndex={-1}
					aria-activedescendant={selectedItem.id}
				>
					<List
						items={items}
						changeSelected={changeSelected}
						selectedItem={selectedItem}
						handleIsOpen={handleIsOpen}
						isOpen={isOpen}
					/>
				</ul>
			</div>
		</div>
	)
}

export { Dropdown }
