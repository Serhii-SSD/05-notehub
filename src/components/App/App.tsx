import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

const PER_PAGE = 12;

export default function App() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(0);
  }, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page: page + 1, perPage: PER_PAGE, search }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {data && totalPages > 1 && (
    <Pagination
      pageCount={totalPages}
      onPageChange={({ selected }) => setPage(selected)}
      forcePage={page}
    />
  )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {error && <ErrorMessage message="Failed to load notes. Please try again." />}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.notes.length === 0 && !isLoading && (
        <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
