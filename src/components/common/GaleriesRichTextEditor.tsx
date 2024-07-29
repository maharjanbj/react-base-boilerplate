

import { Link, RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Superscript } from '@tiptap/extension-superscript'
import { Subscript } from '@tiptap/extension-subscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { Highlight } from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

const content = ''

export const FileMgmtRichTextEditor = (props: any) => {

    const { id } = useParams()
    const isMerchant = location.pathname.includes('merchant')
    const [isLoaded, setIsLoaded] = useState(false)
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            Subscript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({
                placeholder: "Enter product description"
            }),
        ],
        content: props.loadedContent,
        onUpdate: (editor: any) => {
            // const content:any = editor.getHTML(); // Get the HTML representation of the content
            const htmlContent = editor.editor.view.dom.innerHTML // Convert JSON to HTML
            props.changeContentDescription(htmlContent)
        },
    })

    useEffect(() => {
        if (id && !isLoaded && props.loadedContent?.length > 0) {
            editor?.chain().setContent(props.loadedContent).run()
            setIsLoaded(true)
        }
    }, [props.loadedContent])

    return (
        <div>
            <Text size={'sm'}>
                {props?.label ? props?.label : 'Description'}
            </Text>
            <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        {/*<RichTextEditor.ClearFormatting />*/}
                        <RichTextEditor.Highlight />
                        {/*<RichTextEditor.Code />*/}
                        {/*<RichTextEditor.Code />*/}
                        {/*<RichTextEditor.Code />*/}
                        {/*<RichTextEditor.Code />*/}
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
            </RichTextEditor>
        </div>
    )
}
