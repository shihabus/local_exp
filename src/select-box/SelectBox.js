import React, { Component } from 'react'
import './style.css'

export default class SelectBox extends Component {
    state={
        items:this.props.items||[],
        showItems:false,
        seletedItem: this.props.items&&this.props.items[0]
    }
    render() {
        return (
            <div className='select-box--box'>
                <div
                 className='select-box--container'
                >
                    <div className='select-box--selected-item'>
                        {this.state.seletedItem.value}
                    </div>
                <div 
                className='select-box--arrow'
                onClick={()=>this.setState({showItems:!this.state.showItems})}
                >
                    <span className={`${this.state.showItems?'select-box--arrow-up':'select-box--arrow-down'}`}/>
                </div>
                <div 
                className='select-box--items'
                style={{display:this.state.showItems?'block':'none'}}>
                {
                    this.state.items.map(item=>(
                        <div key={item.id}
                        className={this.state.seletedItem===item?'selected':''}
                        onClick={()=>this.setState({seletedItem:item,showItems:false})}
                        >
                            {item.value}
                        </div>
                    ))
                }
                </div>
                </div>
            </div>
        )
    }
}
