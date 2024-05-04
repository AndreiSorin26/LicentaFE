import * as PromptExamples from '../../../../assets/PromtExamples.json'

import { Component } from '@angular/core';
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-prompt-examples-view',
    standalone: true,
    imports: [
        NzFlexDirective,
        NzButtonComponent,
        NzIconDirective,
        NzTooltipDirective,
        NzPopoverDirective
    ],
    templateUrl: './prompt-examples-view.component.html',
    styleUrl: './prompt-examples-view.component.css',
    animations: [
        trigger('fadeAway', [
            state('in', style({ opacity: 1, marginTop: '*'})),
            state('out', style({ opacity: 0, marginTop: '-5vh'})),
            transition('in => out', [
                animate('600ms ease-in-out')
            ])
        ])
    ]
})

export class PromptExamplesViewComponent
{
    promptExamples = PromptExamples
    promptState = 'in'

    query = ''
    sqlQuery = ''
    generatingQuery = false

    generateNewQuery()
    {
        if(this.query !== '')
            this.promptState = 'out'

        setTimeout(() =>
        {
            this.query = ''
            this.sqlQuery = ''
            // @ts-ignore
            const queryIndex = Math.floor(Math.random() * this.promptExamples['examples'].length)
            // @ts-ignore
            this.sqlQuery = this.promptExamples['examples'][queryIndex]['SQL']

            this.generatingQuery = true
            this.completeQuery(queryIndex)
        }, this.query !== '' ? 600 : 0)
    }

    completeQuery(queryIndex: number, charIndex = 0)
    {
        // @ts-ignore
        const query = this.promptExamples['examples'][queryIndex]['natural_language']
        if (charIndex < query.length)
            setTimeout(() =>
            {
                this.query += query[charIndex]
                this.completeQuery(queryIndex, charIndex + 1)
            }, 50)
        else
        {
            this.generatingQuery = false
            this.promptState = 'in'
        }
    }
}
