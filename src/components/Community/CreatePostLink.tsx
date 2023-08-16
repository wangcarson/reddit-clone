// Displays 'Create Post' with icons
// Used in community page, routes to community/submit page
// Used in home page, routes to app/submit page

import { authModalState } from '@/src/atoms/modalAtoms';
import { communityState } from '@/src/atoms/communityAtoms';
import { auth } from '@/src/firebase/clientApp';
import useDirectory from '@/src/hooks/useDirectory';
import { Flex, Icon, Input } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation'; // instead of next/router
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsLink45Deg } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import { IoImageOutline } from 'react-icons/io5';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const CreatePostLink:React.FC = () => {
    
    const router = useRouter();
    const [user] = useAuthState(auth);
    const params = useParams();
    const currentCommunity = useRecoilValue(communityState).currentCommunity;
    const { toggleMenuOpen } = useDirectory();
    const setAuthModalState = useSetRecoilState(authModalState);

    const onClick = () => {
        // If no user, open login modal
        if (!user) {
            setAuthModalState({ open: true, view: 'login' });
            return;
        }

        // Open directory if on home page
        if (!currentCommunity) {
            toggleMenuOpen();
            return;
        }

        // Route to /submit
        router.push(`/r/${params.communityId}/submit`)
    }
    
    return (
        <Flex justify='evenly-spaced' align='center' bg='white' height='56px' borderRadius='4' border='1px solid' borderColor='gray.300' p='2' mb='4'>
            <Icon as={FaReddit} fontSize='36' color='gray.300' mr='4'/>
            
            <Input
                placeholder='Create Post'
                fontSize='10pt'
                _placeholder={{ color: 'gray.500' }}
                _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                bg='gray.50'
                borderColor='gray.200'
                height='36px'
                borderRadius='4'
                mr='4'
                onClick={onClick}
            />

            <Icon as={IoImageOutline} fontSize='24' mr='4' color='gray.400' cursor='pointer'/>
            <Icon as={BsLink45Deg} fontSize='24' color='gray.400' cursor='pointer'/>
        </Flex>
    )
}
export default CreatePostLink;