import {
    Combobox,
    InputBase,
    Input,
    useCombobox,
    Group,
    Text,
    Avatar,
} from '@mantine/core'
import { useState } from 'react'
import { getImageUrl } from '../../utils/helpers/imageUrlHandler'
import { Search } from 'tabler-icons-react'

interface Item {
    img: string
    label: string
}

function SelectOption({ img, label }: Item) {
    return (
        <Group>
            <Avatar src={img ? getImageUrl(img) : ''} radius={20} size={30}>
                {label[0] ?? 'N/A'}
            </Avatar>
            <div className={'pl-xs'}>
                <div className="text-sm font-bold capitalize">
                    {label ?? ''}
                </div>
                {/*<div className="text-lg">{phone}</div>*/}
            </div>
        </Group>
    )
}

export const FileMgmtelectComponent = (props: any) => {
    const { data, form, formKey }: any = props
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })
    const [search, setSearch] = useState('')

    const [value, setValue] = useState<string | null>(null)
    const selectedOption = data.find(
        (item: any) => item.value === form.values[formKey],
    )

    const options = data
        .filter((item: any) =>
            item.label.toLowerCase().includes(search.toLowerCase().trim()),
        )
        .map((item: any) => (
            <Combobox.Option value={item.value} key={item.value}>
                <SelectOption {...item} />
            </Combobox.Option>
        ))

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={val => {
                form.setFieldValue(formKey, val)
                combobox.closeDropdown()
            }}
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                    multiline
                    className={'border-none bg-gray-400'}
                >
                    {selectedOption ? (
                        <SelectOption {...selectedOption} />
                    ) : (
                        <Input.Placeholder>Pick value</Input.Placeholder>
                    )}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    onChange={event => setSearch(event.currentTarget.value)}
                    placeholder="Search options"
                    leftSection={
                        <div className={'text-gray-600'}>
                            <Search />
                        </div>
                    }
                />
                <Combobox.Options style={{ height: '200px', overflow: 'auto' }}>
                    {options.length > 0 ? (
                        options
                    ) : (
                        <Combobox.Empty>Nothing found</Combobox.Empty>
                    )}
                </Combobox.Options>
                {/*<Combobox.Options>{options}</Combobox.Options>*/}
            </Combobox.Dropdown>
        </Combobox>
    )
}
