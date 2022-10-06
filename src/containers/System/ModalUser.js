import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {emitter} from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            firstName: '',
            lastName:'',
            address:'',

        }
        this.listenToEmitter()
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName:'',
                address:'',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () =>{
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) =>{
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName','address']
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false
                alert('Missing parameter:' + arrInput[i])
                break
            }
        }
        
        return isValid
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if(isValid ===true){
            this.props.createNewuser(this.state)
        }
    }
    render() {
        console.log('check child props', this.props);
        console.log('check child ');
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle = {() => {this.toggle()}} 
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => {this.toggle()}}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input 
                            type='text' 
                            onChange={(even)=>{this.handleOnChangeInput(even, 'email')}}
                            value={this.state.email}
                            />

                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(even)=>{this.handleOnChangeInput(even, 'password')}}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' onChange={(even)=>{this.handleOnChangeInput(even, 'firstName')}}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text' onChange={(even)=>{this.handleOnChangeInput(even,'lastName')}}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(even)=>{this.handleOnChangeInput(even, 'address')}}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color='primary' 
                        className='px-3' 
                        onClick={() => {this.handleAddNewUser()}}
                    >Add new</Button>
                    <Button color='secondary' className='px-3' onClick={() => {this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


