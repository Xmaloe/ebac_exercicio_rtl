import { fireEvent, render, screen } from '@testing-library/react';
import PostComments from '.';

describe('Teste para o componente PostComments', () => {
    test('Deve renderizar o componente corretamente', () => {
        render(<PostComments />);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    test('Deve permitir a adição de dois comentários', () => {
        render(<PostComments />);
        
        const input = screen.getByTestId('comment-input');
        const button = screen.getByTestId('submit-button');
        const commentsList = screen.getByTestId('comments-list');

        // Adiciona primeiro comentário
        fireEvent.change(input, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(button);
        
        // Adiciona segundo comentário
        fireEvent.change(input, { target: { value: 'Segundo comentário' } });
        fireEvent.click(button);

        // Verifica se ambos os comentários foram adicionados
        expect(commentsList.children).toHaveLength(2);
        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário')).toBeInTheDocument();
    });

    test('Deve limpar o campo de texto após adicionar um comentário', () => {
        render(<PostComments />);
        
        const input = screen.getByTestId('comment-input') as HTMLTextAreaElement;
        const button = screen.getByTestId('submit-button');

        fireEvent.change(input, { target: { value: 'Novo comentário' } });
        fireEvent.click(button);

        expect(input.value).toBe('');
    });
});